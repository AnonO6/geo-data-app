package services

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"strings"

	"github.com/AnonO6/geo-data-app/models"
	"github.com/AnonO6/geo-data-app/utils"
	"github.com/go-redis/redis/v8"
	"gorm.io/gorm"
)

type AuthService struct {
	db          *gorm.DB
	redisClient *redis.Client
}

func NewAuthService(db *gorm.DB, redisClient *redis.Client) *AuthService {
	return &AuthService{db, redisClient}
}

type RegisterRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (as *AuthService) Register(w http.ResponseWriter, r *http.Request) {
	var req RegisterRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.JSONError(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Validate email format
	if !utils.IsValidEmail(req.Email) {
		utils.JSONError(w, "Invalid email format", http.StatusBadRequest)
		return
	}

	// Validate password length
	if len(req.Password) < 6 {
		utils.JSONError(w, "Password must be at least 6 characters long", http.StatusBadRequest)
		return
	}

	// Hash the password
	hashedPassword, err := utils.HashPassword(req.Password)
	if err != nil {
		utils.JSONError(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}

	// Create user
	user := models.User{
		Email:    req.Email,
		Password: hashedPassword,
	}

	if err := as.db.Create(&user).Error; err != nil {
		utils.JSONError(w, "Failed to create user", http.StatusInternalServerError)
		return
	}

	utils.JSONSuccess(w, "User registered successfully", http.StatusCreated)
}

func (as *AuthService) Login(w http.ResponseWriter, r *http.Request) {
	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.JSONError(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Get user from the database
	var user models.User
	result := as.db.Where("email = ?", req.Email).First(&user)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			utils.JSONError(w, "Invalid credentials", http.StatusUnauthorized)
			return
		}
		utils.JSONError(w, "Database error", http.StatusInternalServerError)
		return
	}

	// Check password
	if !utils.CheckPasswordHash(req.Password, user.Password) {
		utils.JSONError(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	// Generate JWT token
	tokenString, err := utils.GenerateJWT(user.Email)
	if err != nil {
		utils.JSONError(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	// Respond with success
	response := struct {
		ID    uint   `json:"id"`
		Email string `json:"email"`
		Token string `json:"token"`
	}{
		ID:    user.ID,
		Email: user.Email,
		Token: tokenString,
	}

	utils.JSONSuccess(w, response, http.StatusOK)
}

func (as *AuthService) UpdateUser(w http.ResponseWriter, r *http.Request) {
	// Extract token from header
	tokenString, err := utils.GetTokenFromHeader(r)
	if err != nil {
		// Yo
		utils.JSONError(w, "Unauthorised Access", http.StatusUnauthorized)
		return
	}

	// Verify JWT token and extract claims
	claims, err := utils.VerifyJWT(tokenString)
	if err != nil {
		utils.JSONError(w, "Invalid token", http.StatusUnauthorized)
		return
	}

	// Extract user ID from JWT claims (assuming it's stored in the "sub" field or custom claim)
	userID := strings.Split(claims.Username, "|")[0] // Assuming the "sub" (subject) claim contains the user ID
	log.Printf("User ID: %d", strings.Split(claims.Username, "|")[0])
	log.Printf("User ID: %d", userID)
	if err != nil {
		utils.JSONError(w, "Invalid user ID in token", http.StatusBadRequest)
		return
	}

	// Decode request body to get updated fields and old password
	var req struct {
		Email       string `json:"email,omitempty"`
		Password    string `json:"password,omitempty"`
		OldPassword string `json:"old_password"` // Old password is mandatory for updating
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.JSONError(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Ensure old password is provided
	if req.OldPassword == "" {
		utils.JSONError(w, "Old password is required", http.StatusBadRequest)
		return
	}

	// Fetch user from the database using the extracted userID
	var user models.User
	if err := as.db.Where("email = ?", userID).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			utils.JSONError(w, "User not found", http.StatusNotFound)
		} else {
			utils.JSONError(w, "Database error", http.StatusInternalServerError)
		}
		return
	}

	// Verify the old password
	if !utils.CheckPasswordHash(req.OldPassword, user.Password) {
		utils.JSONError(w, "Incorrect old password", http.StatusUnauthorized)
		return
	}

	// Ensure at least one field (email or password) is being updated
	if req.Email == "" && req.Password == "" {
		utils.JSONError(w, "No fields to update", http.StatusBadRequest)
		return
	}

	// Update the user's email if provided
	if req.Email != "" {
		if !utils.IsValidEmail(req.Email) { // Validate the new email
			utils.JSONError(w, "Invalid email format", http.StatusBadRequest)
			return
		}
		user.Email = req.Email
	}

	// Update the user's password if provided
	if req.Password != "" {
		if len(req.Password) < 6 { // Ensure the password is strong
			utils.JSONError(w, "Password must be at least 6 characters long", http.StatusBadRequest)
			return
		}
		hashedPassword, err := utils.HashPassword(req.Password) // Hash the new password
		if err != nil {
			utils.JSONError(w, "Failed to hash password", http.StatusInternalServerError)
			return
		}
		user.Password = hashedPassword
	}

	// Save the updated user in the database
	if err := as.db.Save(&user).Error; err != nil {
		utils.JSONError(w, "Failed to update user", http.StatusInternalServerError)
		return
	}

	utils.JSONSuccess(w, "User updated successfully", http.StatusOK)
}
