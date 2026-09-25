<script lang="ts">
	import type { Task } from '$lib/models/Task.interface';

	const sampleTasks: Task[] = [
		{
			id: '1',
			name: 'Fix production bug',
			description: 'Critical login issue affecting users',
			deadline: '2026-09-25',
			importance: 4,
			urgency: 4,
			status: 'todo'
		},
		{
			id: '2',
			name: 'Security patch',
			description: 'Apply urgent security update',
			deadline: '2026-09-26',
			importance: 3.5,
			urgency: 3.5,
			status: 'in-progress'
		},
		{
			id: '3',
			name: 'Client deadline',
			description: 'Deliver project milestone',
			deadline: '2026-09-27',
			importance: 3,
			urgency: 3,
			status: 'todo'
		},
		{
			id: '4',
			name: 'Strategic planning',
			description: 'Q4 roadmap and goals',
			deadline: '2026-10-15',
			importance: 4,
			urgency: -2,
			status: 'todo'
		},
		{
			id: '5',
			name: 'Learn new framework',
			description: 'Study Svelte 5 patterns',
			deadline: null,
			importance: 3,
			urgency: -3,
			status: 'todo'
		},
		{
			id: '6',
			name: 'Code refactoring',
			description: 'Improve component architecture',
			deadline: '2026-11-01',
			importance: 2,
			urgency: -1,
			status: 'in-progress'
		},
		{
			id: '7',
			name: 'Reply to emails',
			description: 'Respond to team messages',
			deadline: '2026-09-25',
			importance: -1,
			urgency: 3.5,
			status: 'todo'
		},
		{
			id: '8',
			name: 'Team standup',
			description: 'Daily sync meeting',
			deadline: '2026-09-25',
			importance: -0.5,
			urgency: 3,
			status: 'done'
		},
		{
			id: '9',
			name: 'Schedule meetings',
			description: 'Book calendar for next week',
			deadline: '2026-09-26',
			importance: -3.5,
			urgency: 1,
			status: 'todo'
		},
		{
			id: '10',
			name: 'Organize desk',
			description: 'Clean up workspace',
			deadline: null,
			importance: 2,
			urgency: 2,
			status: 'todo'
		},
		{
			id: '11',
			name: 'Browse social media',
			description: 'Check industry news',
			deadline: null,
			importance: -4,
			urgency: -2,
			status: 'todo'
		},
		{
			id: '12',
			name: 'Coffee break',
			description: 'Take a short break',
			deadline: null,
			importance: -4.5,
			urgency: -4,
			status: 'done'
		}
	];

	const MIN_COORD = -5;
	const MAX_COORD = 5;
	const TASK_RADIUS = 6;

	function coordToSvg(value: number, axis: 'x' | 'y', size: number): number {
		const range = MAX_COORD - MIN_COORD;
		const normalized = (value - MIN_COORD) / range;
		if (axis === 'x') {
			return normalized * size;
		} else {
			return (1 - normalized) * size;
		}
	}
</script>

<main class="matrix">
	<div class="svg-container">
		<svg
			class="coordinate-plane"
			viewBox={`0 0 ${580} ${580}`}
			preserveAspectRatio="xMidYMid meet"
			role="img"
			aria-label="Eisenhower Matrix coordinate plane with tasks plotted by urgency and importance"
		>
			<defs>
				<linearGradient id="q1-bg" x1="0%" y1="100%" x2="0%" y2="0%">
					<stop offset="0%" stop-color="#dc3545" stop-opacity="0.04" />
					<stop offset="100%" stop-color="#dc3545" stop-opacity="0.01" />
				</linearGradient>
				<linearGradient id="q2-bg" x1="100%" y1="100%" x2="100%" y2="0%">
					<stop offset="0%" stop-color="#198754" stop-opacity="0.04" />
					<stop offset="100%" stop-color="#198754" stop-opacity="0.01" />
				</linearGradient>
				<linearGradient id="q3-bg" x1="100%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stop-color="#ffc107" stop-opacity="0.04" />
					<stop offset="100%" stop-color="#ffc107" stop-opacity="0.01" />
				</linearGradient>
				<linearGradient id="q4-bg" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stop-color="#6c757d" stop-opacity="0.04" />
					<stop offset="100%" stop-color="#6c757d" stop-opacity="0.01" />
				</linearGradient>
			</defs>

			<!-- Quadrant background regions -->
			<rect x="290" y="30" width="260" height="260" fill="url(#q1-bg)" />
			<rect x="30" y="30" width="260" height="260" fill="url(#q2-bg)" />
			<rect x="290" y="290" width="260" height="260" fill="url(#q3-bg)" />
			<rect x="30" y="290" width="260" height="260" fill="url(#q4-bg)" />

			<!-- Grid lines -->
			<g class="grid-lines" stroke="#e0e0e0" stroke-width="0.5">
				{#each Array.from({ length: 11 }, (_, i) => i - 5) as coord  (coord)}
					<!-- Horizontal grid lines (constant Y = importance) -->
					<line
						x1={30 + coordToSvg(MIN_COORD, 'x', 520)}
						y1={30 + coordToSvg(coord, 'y', 520)}
						x2={30 + coordToSvg(MAX_COORD, 'x', 520)}
						y2={30 + coordToSvg(coord, 'y', 520)}
					/>
					<!-- Vertical grid lines (constant X = urgency) -->
					<line
						x1={30 + coordToSvg(coord, 'x', 520)}
						y1={30 + coordToSvg(MIN_COORD, 'y', 520)}
						x2={30 + coordToSvg(coord, 'x', 520)}
						y2={30 + coordToSvg(MAX_COORD, 'y', 520)}
					/>
				{/each}
			</g>

			<!-- Main axes (X=0 and Y=0) -->
			<g class="axes" stroke="#666" stroke-width="2">
				<!-- Y=0 axis (horizontal line through center) -->
				<line
					x1={30 + coordToSvg(MIN_COORD, 'x', 520)}
					y1={30 + coordToSvg(0, 'y', 520)}
					x2={30 + coordToSvg(MAX_COORD, 'x', 520)}
					y2={30 + coordToSvg(0, 'y', 520)}
				/>
				<!-- X=0 axis (vertical line through center) -->
				<line
					x1={30 + coordToSvg(0, 'x', 520)}
					y1={30 + coordToSvg(MIN_COORD, 'y', 520)}
					x2={30 + coordToSvg(0, 'x', 520)}
					y2={30 + coordToSvg(MAX_COORD, 'y', 520)}
				/>
			</g>

			<!-- Axis labels (tick marks and numbers) -->
			<g class="axis-labels" font-family="system-ui, sans-serif" font-size="10" fill="#666" text-anchor="middle">
				{#each Array.from({ length: 11 }, (_, i) => i - 5) as coord  (coord)}
					<!-- X-axis labels (urgency) -->
					<text
						x={35 +coordToSvg(coord, 'x', 520)}
						y={30 +coordToSvg(0, 'y', 520) - 12}
						dominant-baseline="hanging"
					>
						{coord}
					</text>
					<!-- Y-axis labels (importance) -->
					<text
						x={30 +coordToSvg(0, 'x', 520) - 5}
						y={25 +coordToSvg(coord, 'y', 520)}
						dominant-baseline="middle"
						text-anchor="end"
					>
						{coord}
					</text>
				{/each}
			</g>

			<!-- Axis titles -->
			<text
				class="axis-title"
				x={coordToSvg(MAX_COORD, 'x', 580) - 5}
				y={coordToSvg(0, 'y', 580) + 15}
				font-family="system-ui, sans-serif"
				font-size="12"
				font-weight="600"
				fill="#333"
				text-anchor="end"
			>
				Urgency
			</text>
			<text
				class="axis-title"
				x={coordToSvg(0, 'x', 580) - 70}
				y={coordToSvg(MAX_COORD, 'y', 580) }
				font-family="system-ui, sans-serif"
				font-size="12"
				font-weight="600"
				fill="#333"
				text-anchor="end"
				transform={`rotate(-90, ${coordToSvg(0, 'x', 580) - 18}, ${coordToSvg(MAX_COORD, 'y', 580) - 30})`}
			>
				Importance
			</text>

			<!-- Quadrant labels -->
			<g class="quadrant-labels" font-family="system-ui, sans-serif" font-size="11" fill="#999" font-weight="500" opacity="0.9">
				<!-- Q1: Important + Urgent (top-right) -->
				<text x="420" y="20" text-anchor="end">Q1: Important + Urgent</text>
				<!-- Q2: Important + Not Urgent (top-left) -->
				<text x="30" y="20">Q2: Important + Not Urgent</text>
				<!-- Q3: Not Important + Urgent (bottom-right) -->
				<text x="450" y="565" text-anchor="end">Q3: Not Important + Urgent</text>
				<!-- Q4: Not Important + Not Urgent (bottom-left) -->
				<text x="30" y="565">Q4: Not Important + Not Urgent</text>
			</g>

			<!-- Task dots -->
			<g class="tasks">
				{#each sampleTasks as task (task.id)}
					<circle
						cx={30+coordToSvg(task.urgency, 'x', 520)}
						cy={30+coordToSvg(task.importance, 'y', 520)}
						r={TASK_RADIUS}
						class="task-dot"
						data-status={task.status}
					>
						<title>{task.name}: {task.description}</title>
					</circle>
				{/each}
			</g>
		</svg>
	</div>
</main>

<style>
	.matrix {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		padding: 1.5rem;
		box-sizing: border-box;
		background: #fafafa;
	}

	.svg-container {
		width: 100%;
		max-width: 700px;
		aspect-ratio: 1 / 1;
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		overflow: hidden;
	}

	.coordinate-plane {
		width: 100%;
		height: 100%;
		display: block;
	}

	.grid-lines {
		vector-effect: non-scaling-stroke;
	}

	.axes {
		vector-effect: non-scaling-stroke;
	}

	.axis-labels {
		vector-effect: non-scaling-stroke;
		user-select: none;
		pointer-events: none;
	}

	.quadrant-labels {
		user-select: none;
		pointer-events: none;
	}

	.task-dot {
		stroke: white;
		stroke-width: 2;
		vector-effect: non-scaling-stroke;
		cursor: default;
		transition: r 0.15s ease, stroke-width 0.15s ease, filter 0.15s ease;
	}

	.task-dot:hover {
		r: 11;
		stroke-width: 3;
		filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2));
	}

	/* Status-based colors for task dots */
	.task-dot[data-status="todo"] {
		--task-color: #dc3545;
	}
	.task-dot[data-status="in-progress"] {
		--task-color: #ffc107;
	}
	.task-dot[data-status="done"] {
		--task-color: #198754;
	}

	@media (max-width: 768px) {
		.matrix {
			padding: 1rem;
		}

		.svg-container {
			border-radius: 8px;
		}

		.quadrant-labels {
			font-size: 9;
		}

		.axis-labels {
			font-size: 9;
		}
	}

	@media (max-width: 480px) {
		.matrix {
			padding: 0.5rem;
		}

		.quadrant-labels {
			font-size: 8;
		}

		.axis-labels {
			font-size: 8;
		}

		.axis-title {
			font-size: 10 !important;
		}
	}
</style>