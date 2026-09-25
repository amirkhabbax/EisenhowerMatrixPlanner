import type { Task } from '../models/Task.interface.ts';

export type Quadrant = 'Q1' | 'Q2' | 'Q3' | 'Q4';

export function determineQuadrant(task: Task): Quadrant {
  const { importance, urgency } = task;

  if (importance >= 0 && urgency >= 0) return 'Q1';
  if (importance >= 0 && urgency < 0) return 'Q2';
  if (importance < 0 && urgency >= 0) return 'Q3';

  return 'Q4';
}

export function calculatePriority(task: Task): number {
  return task.importance * task.urgency;
}

export function groupByQuadrant(tasks: Task[]): Record<Quadrant, Task[]> {
  const groups = tasks.reduce<Record<Quadrant, Task[]>>(
    (groups, task) => {
      const quadrant = determineQuadrant(task);
      groups[quadrant].push(task);
      return groups;
    },
    {
      Q1: [],
      Q2: [],
      Q3: [],
      Q4: []
    } satisfies Record<Quadrant, Task[]>
  );

  // Sort each quadrant by priority, highest first. Array.prototype.sort is
  // stable, so tasks with equal priority keep their original relative order.
  for (const quadrant of Object.keys(groups) as Quadrant[]) {
    groups[quadrant].sort((a, b) => calculatePriority(b) - calculatePriority(a));
  }

  return groups;
}