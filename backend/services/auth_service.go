package services

import (
	"errors"

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

func (as *AuthService) Register(req RegisterRequest) error {
	hashedPassword, err := utils.HashPassword(req.Password)
	if err != nil {
		return err
	}

	user := models.User{
		Email:    req.Email,
		Password: hashedPassword,
	}

	result := as.db.Create(&user)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (as *AuthService) Login(req LoginRequest) (string, error) {
	var user models.User
	result := as.db.Where("email = ?", req.Email).First(&user)
	if result.Error != nil {
		return "", errors.New("invalid credentials")
	}

	if !utils.CheckPasswordHash(req.Password, user.Password) {
		return "", errors.New("invalid credentials")
	}

	token, err := utils.GenerateJWT(user.Email)
	if err != nil {
		return "", err
	}

	return token, nil
}
