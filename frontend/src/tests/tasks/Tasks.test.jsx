import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Tasks from '../../components/tasks/Tasks';
import * as api from '../../utils/api';

vi.mock('../../utils/api', () => ({
    fetchTasks: vi.fn(),
    deleteTask: vi.fn()
}));

describe('Tasks Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        delete window.location;
        window.location = { href: '' };
        window.confirm = vi.fn(() => true);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('shows loading initially', async () => {
        api.fetchTasks.mockResolvedValueOnce({ tasks: [] });
        render(<Tasks />);
        expect(screen.getByText('Loading tasks...')).toBeInTheDocument();
        await waitFor(() => expect(screen.queryByText('Loading tasks...')).not.toBeInTheDocument());
    });

    it('shows no tasks message when empty', async () => {
        api.fetchTasks.mockResolvedValueOnce({ tasks: [] });
        render(<Tasks />);
        await waitFor(() => {
            expect(screen.getByText('No tasks found. Create one to get started!')).toBeInTheDocument();
        });
    });

    it('renders list of tasks', async () => {
        api.fetchTasks.mockResolvedValueOnce({
            tasks: [
                { id: 1, title: 'Learn Testing', status: 'Pending' },
                { id: 2, title: 'Write Tests', status: 'Completed' }
            ]
        });
        render(<Tasks />);
        await waitFor(() => {
            expect(screen.getByText('Learn Testing')).toBeInTheDocument();
            expect(screen.getByText('Pending')).toBeInTheDocument();
            expect(screen.getByText('Write Tests')).toBeInTheDocument();
            expect(screen.getByText('Completed')).toBeInTheDocument();
        });
    });

    it('redirects to login if token is invalid', async () => {
        api.fetchTasks.mockResolvedValueOnce({ message: 'Invalid or expired token.' });
        render(<Tasks />);
        await waitFor(() => {
            expect(window.location.href).toBe('/login');
        });
    });

    it('deletes a task successfully', async () => {
        api.fetchTasks.mockResolvedValueOnce({
            tasks: [{ id: 1, title: 'Task to delete', status: 'Pending' }]
        });
        api.deleteTask.mockResolvedValueOnce({ message: 'Task deleted successfully' });
        
        render(<Tasks />);
        await waitFor(() => {
            expect(screen.getByText('Task to delete')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByRole('button', { name: /Delete/i }));
        
        expect(window.confirm).toHaveBeenCalled();
        await waitFor(() => {
            expect(screen.queryByText('Task to delete')).not.toBeInTheDocument();
        });
    });

    it('handles delete failure gracefully', async () => {
        api.fetchTasks.mockResolvedValueOnce({
            tasks: [{ id: 1, title: 'Task to keep', status: 'Pending' }]
        });
        api.deleteTask.mockResolvedValueOnce({ message: 'Delete failed' });
        const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
        
        render(<Tasks />);
        await waitFor(() => {
            expect(screen.getByText('Task to keep')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByRole('button', { name: /Delete/i }));
        
        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith('Delete failed');
            expect(screen.getByText('Task to keep')).toBeInTheDocument();
        });
        alertMock.mockRestore();
    });
});
