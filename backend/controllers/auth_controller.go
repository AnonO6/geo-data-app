package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/AnonO6/geo-data-app/services"
	"github.com/AnonO6/geo-data-app/utils"
)

type AuthController struct {
	authService *services.AuthService
}

func NewAuthController(authService *services.AuthService) *AuthController {
	return &AuthController{authService}
}

func (ac *AuthController) Register(w http.ResponseWriter, r *http.Request) {
	var req services.RegisterRequest
	json.NewDecoder(r.Body).Decode(&req)

	err := ac.authService.Register(req)
	if err != nil {
		utils.JSONError(w, err.Error(), http.StatusBadRequest)
		return
	}

	utils.JSONSuccess(w, "User registered successfully", http.StatusCreated)
}

func (ac *AuthController) Login(w http.ResponseWriter, r *http.Request) {
	var req services.LoginRequest
	json.NewDecoder(r.Body).Decode(&req)

	token, err := ac.authService.Login(req)
	if err != nil {
		utils.JSONError(w, err.Error(), http.StatusUnauthorized)
		return
	}

	utils.JSONSuccess(w, token, http.StatusOK)
}
