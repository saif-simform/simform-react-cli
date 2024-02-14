import React from "react";
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { useDispatch } from "react-redux";
import { login } from "../../utils/api";
import Cookies from "js-cookie";

vitest.mock('react-redux');
vitest.mock('react-router-dom');
vitest.mock('../../utils/api');
vitest.mock('js-cookie');

const mockNavigator = vitest.fn()
useNavigate.mockReturnValue(mockNavigator);

const mockDispatch = vitest.fn();
useDispatch.mockReturnValue(mockDispatch);

login.mockResolvedValueOnce({
    data: { accessToken: 'mockAccessToken', refreshToken: 'mockRefreshToken' },
    status: 200,
});

describe('Login Component', () => {
    beforeEach(() => {
        render(<Login />)
    })

    it('Should render Login component with heading text correctly', () => {

        const headingText = screen.getByTestId('heading-text')

        expect(headingText).toBeInTheDocument()
    })

    it('Should handle login successfully', async () => {

        const emailInput = screen.getByLabelText("Email Address")
        const passwordInput = screen.getByLabelText("Password")
        const loginButton = screen.getByRole('button', { name: "Login" })

        fireEvent.change(emailInput, { target: { value: "abc@test.com" } })
        fireEvent.change(passwordInput, { target: { value: "123123" } })

        fireEvent.submit(loginButton)

        // Wait for the asynchronous login operation to complete
        await waitFor(() => {
            expect(login).toHaveBeenCalledWith({ email: "abc@test.com", password: "123123" })

            expect(Cookies.set).toHaveBeenCalledWith('accessToken', 'mockAccessToken');
            expect(Cookies.set).toHaveBeenCalledWith('refreshToken', 'mockRefreshToken');
            expect(mockDispatch).toHaveBeenCalledWith({ type: 'auth/loginSuccess', payload: { email: 'abc@test.com', password: '123123' } })
            expect(mockNavigator).toHaveBeenCalledWith('/')
        })
    })
})