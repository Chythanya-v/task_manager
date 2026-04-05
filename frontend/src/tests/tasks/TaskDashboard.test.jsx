import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TaskDashboard from '../../components/tasks/TaskDashboard';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../components/auth/signup', () => ({
    default: () => <div>Signup Component Mock</div>,
}));

vi.mock('../../components/auth/login', () => ({
    default: () => <div>Login Component Mock</div>,
}));

vi.mock('../../components/tasks/Tasks', () => ({
    default: () => <div>Tasks Component Mock</div>,
}));

vi.mock('../../components/tasks/TaskNewEdit', () => ({
    default: () => <div>TaskNewEdit Component Mock</div>,
}));

const renderWithRouter = (ui, initialEntries = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            {ui}
        </MemoryRouter>
    );
};

describe('TaskDashboard Component', () => {
    it('renders signup on root path', () => {
        renderWithRouter(<TaskDashboard />, ['/']);
        expect(screen.getByText('Signup Component Mock')).toBeInTheDocument();
    });

    it('renders login on /login path', () => {
        renderWithRouter(<TaskDashboard />, ['/login']);
        expect(screen.getByText('Login Component Mock')).toBeInTheDocument();
    });

    it('renders tasks list on /tasks path', () => {
        renderWithRouter(<TaskDashboard />, ['/tasks']);
        expect(screen.getByText('Tasks Component Mock')).toBeInTheDocument();
    });

    it('renders new task form on /tasks/new', () => {
        renderWithRouter(<TaskDashboard />, ['/tasks/new']);
        expect(screen.getByText('TaskNewEdit Component Mock')).toBeInTheDocument();
    });

    it('renders edit task form on /tasks/:id', () => {
        renderWithRouter(<TaskDashboard />, ['/tasks/123']);
        expect(screen.getByText('TaskNewEdit Component Mock')).toBeInTheDocument();
    });
});
