import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Signup from '../../components/auth/signup';

describe('Signup Component', () => {
    beforeEach(() => {
        global.fetch = vi.fn();
    });

    it('renders signup form properly', () => {
        render(<Signup />);
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
    });

    it('shows network error alert on fetch failure', async () => {
        global.fetch.mockRejectedValueOnce(new Error('Network error'));

        render(<Signup />);
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

        await waitFor(() => {
            expect(screen.getByText('Error')).toBeInTheDocument();
            expect(screen.getByText('Network error. Please check your connection.')).toBeInTheDocument();
        });
    });

    it('shows error alert on failed signup response', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false,
            text: async () => JSON.stringify({ message: 'User already exists' })
        });

        render(<Signup />);
        fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

        await waitFor(() => {
            expect(screen.getByText('Error')).toBeInTheDocument();
            expect(screen.getByText('User already exists')).toBeInTheDocument();
        });
    });

    it('shows success alert on successful signup', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            text: async () => JSON.stringify({ message: 'User created successfully' })
        });

        render(<Signup />);
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'newuser@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

        await waitFor(() => {
            expect(screen.getByText('Success')).toBeInTheDocument();
            expect(screen.getByText('User created successfully')).toBeInTheDocument();
        });
    });
});
