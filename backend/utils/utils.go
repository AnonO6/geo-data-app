package utils

import (
	"encoding/json"
	"errors"
	"net/http"
	"os"
	"regexp"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
)

// HashPassword hashes a plain-text password using bcrypt
func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		logrus.Errorf("Error hashing password: %v", err)
		return "", err
	}
	return string(hashedPassword), nil
}

// CheckPasswordHash compares a plaintext password with a hashed password
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	if err != nil {
		logrus.Warnf("Password mismatch: %v", err)
		return false
	}
	return true
}

// JSONSuccess sends a success response in JSON format
func JSONSuccess(w http.ResponseWriter, data interface{}, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	err := json.NewEncoder(w).Encode(data)
	if err != nil {
		logrus.Errorf("Error encoding success JSON response: %v", err)
	}
}

// JSONError sends an error response in JSON format
func JSONError(w http.ResponseWriter, message string, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	err := json.NewEncoder(w).Encode(map[string]string{"error": message})
	if err != nil {
		logrus.Errorf("Error encoding error JSON response: %v", err)
	}
}

// JWT secret key (read from environment variables)
var jwtSecret = []byte(os.Getenv("JWT_SECRET")) // Ensure this is set in your environment

// Claims represents the structure of JWT claims
type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

// VerifyJWT verifies the JWT token and returns the claims if valid
func VerifyJWT(tokenString string) (*Claims, error) {
	// Parse the token and validate it using the secret key
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		// Ensure the signing method is HMAC
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return jwtSecret, nil
	})

	if err != nil {
		logrus.Errorf("Error parsing token: %v", err)
		return nil, err
	}

	// Check if the token is valid and extract the claims
	if claims, ok := token.Claims.(*Claims); ok && token.Valid {
		if claims.ExpiresAt < time.Now().Unix() {
			logrus.Warn("Token expired")
			return nil, errors.New("token expired")
		}
		return claims, nil
	} else {
		logrus.Error("Invalid JWT token")
		return nil, errors.New("invalid token")
	}
}

// GenerateJWT generates a JWT token for a given username
func GenerateJWT(username string) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour).Unix() // Set token expiry for 24 hours

	// Create the JWT claims
	claims := &Claims{
		Username: username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime,
		},
	}

	// Create the token with the claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Sign the token with the secret key
	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		logrus.Errorf("Error signing token: %v", err)
		return "", err
	}

	return tokenString, nil
}

// IsValidEmail validates an email using a regular expression
func IsValidEmail(email string) bool {
	re := regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)
	return re.MatchString(email)
}

// ExpireJWT forcibly expires a JWT by reducing its expiration time (optional helper)
func ExpireJWT(tokenString string) (string, error) {
	claims, err := VerifyJWT(tokenString)
	if err != nil {
		logrus.Errorf("Error verifying token during expiration: %v", err)
		return "", err
	}

	// Set token expiration to current time (forces expiration)
	claims.ExpiresAt = time.Now().Unix()

	// Create a new token with the updated expiration
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	newTokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		logrus.Errorf("Error signing token after expiration: %v", err)
		return "", err
	}

	return newTokenString, nil
}

// GetTokenFromHeader extracts JWT from the Authorization header
func GetTokenFromHeader(r *http.Request) (string, error) {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		return "", errors.New("authorization header is missing")
	}

	// Ensure the header is in the format: "Bearer <token>"
	tokenParts := regexp.MustCompile(`\s+`).Split(authHeader, 2)
	if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
		return "", errors.New("invalid authorization header format")
	}

	return tokenParts[1], nil
}
