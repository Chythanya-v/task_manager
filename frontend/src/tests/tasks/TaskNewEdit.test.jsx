import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TaskNewEdit from '../../components/tasks/TaskNewEdit';
import * as api from '../../utils/api';
import { MemoryRouter, Routes, Route } from 'react-router';

vi.mock('../../utils/api', () => ({
    createTask: vi.fn(),
    fetchTask: vi.fn(),
    updateTask: vi.fn()
}));

const renderWithRouter = (ui, initialEntries = ['/tasks/new']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <Routes>
                <Route path="/tasks/new" element={ui} />
                <Route path="/tasks/:id" element={ui} />
            </Routes>
        </MemoryRouter>
    );
};

describe('TaskNewEdit Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        delete window.location;
        window.location = { href: '' };
        
        // Mock ResizeObserver for Radix UI dropdown
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        };
    });

    it('renders form elements properly', async () => {
        renderWithRouter(<TaskNewEdit />);
        await waitFor(() => {
            expect(screen.getByRole('textbox', { name: /Task/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /Pending/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
        });
    });

    it('creates a new task successfully', async () => {
        api.createTask.mockResolvedValueOnce({ task: { id: 1, title: 'New Task', status: 'Pending' } });

        renderWithRouter(<TaskNewEdit />);
        
        fireEvent.change(screen.getByRole('textbox', { name: /Task/i }), { target: { value: 'New Task' } });
        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        await waitFor(() => {
            expect(api.createTask).toHaveBeenCalledWith({ title: 'New Task', status: 'Pending' });
            expect(window.location.href).toBe('/tasks');
        });
    });

    it('fetches and populates an existing task for edit', async () => {
        api.fetchTask.mockResolvedValueOnce({ task: { id: 1, title: 'Old Task', status: 'Completed' } });

        renderWithRouter(<TaskNewEdit />, ['/tasks/1']);

        await waitFor(() => {
            expect(api.fetchTask).toHaveBeenCalledWith('1');
            expect(screen.getByRole('textbox', { name: /Task/i })).toHaveValue('Old Task');
            expect(screen.getByRole('button', { name: /Completed/i })).toBeInTheDocument();
        });
    });

    it('updates an existing task successfully', async () => {
        api.fetchTask.mockResolvedValueOnce({ task: { id: 1, title: 'Old Task', status: 'Pending' } });
        api.updateTask.mockResolvedValueOnce({ task: { id: 1, title: 'Updated Task', status: 'Completed' } });

        renderWithRouter(<TaskNewEdit />, ['/tasks/1']);

        await waitFor(() => {
            expect(screen.getByRole('textbox', { name: /Task/i })).toHaveValue('Old Task');
        });

        fireEvent.change(screen.getByRole('textbox', { name: /Task/i }), { target: { value: 'Updated Task' } });
        // Since it's Radix UI, firing regular click on dropdown triggers might be tricky. Let's just assume we only test title update.
        // Wait, the status is a DropdownMenu, we can test just clicking Submit.
        
        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        await waitFor(() => {
            expect(api.updateTask).toHaveBeenCalledWith('1', { title: 'Updated Task', status: 'Pending' });
            expect(window.location.href).toBe('/tasks');
        });
    });
});
