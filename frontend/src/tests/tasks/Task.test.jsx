import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Task from '../../components/tasks/Task';

describe('Task Component', () => {
    it('renders task properly', () => {
        render(<Task />);
        expect(screen.getByText('Task')).toBeInTheDocument();
    });
});
