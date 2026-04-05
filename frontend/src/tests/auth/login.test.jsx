import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Login from '../../components/auth/login';

describe('Login Component', () => {
    beforeEach(() => {
        global.fetch = vi.fn();
        delete window.location;
        window.location = { href: '' };
        localStorage.clear();
    });

    it('renders login form properly', () => {
        render(<Login />);
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    });

    it('shows network error alert on fetch failure', async () => {
        global.fetch.mockRejectedValueOnce(new Error('Network error'));
        const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

        render(<Login />);
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith('Network error. Please check your connection.');
        });
        alertMock.mockRestore();
    });

    it('shows error alert on invalid credentials', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false,
            text: async () => JSON.stringify({ message: 'Invalid credentials' })
        });
        const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

        render(<Login />);
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith('Invalid credentials');
        });
        alertMock.mockRestore();
    });

    it('logs in successfully and redirects', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            text: async () => JSON.stringify({ token: 'fake-jwt-token' })
        });

        render(<Login />);
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        await waitFor(() => {
            expect(localStorage.getItem('token')).toBe('fake-jwt-token');
            expect(window.location.href).toBe('/tasks');
        });
    });
});
