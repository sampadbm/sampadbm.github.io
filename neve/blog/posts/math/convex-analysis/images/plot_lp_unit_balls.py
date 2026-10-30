"""Draw planar lp unit balls and their polars on identical coordinate scales.

Run with matplotlib installed:
    python plot_lp_unit_balls.py --preview-dir /tmp/lp-unit-balls-preview

SVGs are saved beside this script; optional PNG previews go to --preview-dir.
"""

import argparse
from pathlib import Path

import matplotlib

matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import FancyArrowPatch


PAIRS = [
    (1, np.inf, '1', r'\infty', 'lp-1-infinity'),
    (4 / 3, 4, '4/3', '4', 'lp-four-thirds-4'),
    (2, 2, '2', '2', 'lp-2-2'),
    (np.inf, 1, r'\infty', '1', 'lp-infinity-1'),
]


def boundary(p):
    if p == 1:
        points = np.array([[1, 0], [0, 1], [-1, 0], [0, -1], [1, 0]])
    elif np.isinf(p):
        points = np.array([[1, 1], [-1, 1], [-1, -1], [1, -1], [1, 1]])
    else:
        theta = np.linspace(0, 2 * np.pi, 513)
        directions = np.column_stack([np.cos(theta), np.sin(theta)])
        radii = np.sum(np.abs(directions) ** p, axis=1) ** (-1 / p)
        points = directions * radii[:, None]

    norms = (np.max(np.abs(points), axis=1) if np.isinf(p)
             else np.sum(np.abs(points) ** p, axis=1) ** (1 / p))
    assert np.allclose(norms, 1, atol=1e-12), 'Every plotted point must lie on the unit sphere'
    return points


def draw_ball(ax, p, label, color, role, coordinate):
    points = boundary(p)
    ax.fill(points[:, 0], points[:, 1], color=color, alpha=0.13, zorder=1)
    ax.plot(points[:, 0], points[:, 1], color=color, linewidth=2.1, zorder=3)
    ax.set(xlim=(-1.4, 1.4), ylim=(-1.4, 1.4), aspect='equal')
    ax.set_facecolor('white')
    for name in ('top', 'right'):
        ax.spines[name].set_visible(False)
    for name in ('bottom', 'left'):
        ax.spines[name].set_position('zero')
        ax.spines[name].set_color('#8b8b87')
        ax.spines[name].set_linewidth(0.7)
        ax.spines[name].set_zorder(2)
    ax.set_xticks([-1, 1], labels=['', ''])
    ax.set_yticks([-1, 1], labels=['', ''])
    ax.tick_params(length=3, width=0.7, labelsize=12, pad=4, color='#8b8b87')
    # Put labels outside the unit square so the boundary never crosses them.
    for point, label, offset, horizontal, vertical in [
        ((-1, 0), '−1', (-5, -5), 'right', 'top'),
        ((1, 0), '1', (5, -5), 'left', 'top'),
        ((0, -1), '−1', (-5, -5), 'right', 'top'),
        ((0, 1), '1', (-5, 5), 'right', 'bottom'),
    ]:
        ax.annotate(label, point, xytext=offset, textcoords='offset points',
                    ha=horizontal, va=vertical, fontsize=12, color='#55534e')
    ax.plot(0, 0, '.', color='#35332e', markersize=3, zorder=4)
    ax.annotate('0', (0, 0), xytext=(-5, -5), textcoords='offset points',
                ha='right', va='top', fontsize=11)
    ax.text(1.35, -0.32, rf'${coordinate}_1$', fontsize=13, ha='center', va='top')
    ax.text(0.13, 1.35, rf'${coordinate}_2$', fontsize=13, ha='left', va='center')
    ax.set_title(rf'{role} $B_{{{label}}}$', color=color, fontsize=16, pad=15)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--preview-dir', type=Path)
    args = parser.parse_args()
    output = Path(__file__).resolve().parent
    if args.preview_dir:
        args.preview_dir.mkdir(parents=True, exist_ok=True)

    plt.rcParams.update({
        'font.family': 'DejaVu Serif',
        'mathtext.fontset': 'dejavuserif',
        'text.color': '#25211d',
        'xtick.color': '#55534e',
        'ytick.color': '#55534e',
        'svg.hashsalt': 'lp-unit-balls',
    })
    for p, q, p_label, q_label, filename in PAIRS:
        assert np.isclose(1 / p + 1 / q, 1), 'Exponents must be conjugate'
        fig = plt.figure(figsize=(7, 3.5), facecolor='white')
        left = fig.add_axes((0.08, 0.16, 0.34, 0.68))
        right = fig.add_axes((0.58, 0.16, 0.34, 0.68))
        draw_ball(left, p, p_label, '#008c87', 'Primal', 'x')
        draw_ball(right, q, q_label, '#2768bd', 'Dual', 'y')
        arrow = FancyArrowPatch((0.455, 0.50), (0.545, 0.50),
                                transform=fig.transFigure, arrowstyle='->',
                                mutation_scale=14, linewidth=1, color='#69665e')
        fig.add_artist(arrow)
        fig.text(0.5, 0.56, 'polar', ha='center', va='bottom', fontsize=11, color='#69665e')
        fig.text(0.5, 0.045, rf'$B_{{{p_label}}}^\circ = B_{{{q_label}}}$',
                 ha='center', va='bottom', fontsize=16)
        fig.savefig(output / f'{filename}.svg',
                    metadata={'Date': None, 'Creator': 'plot_lp_unit_balls.py'})
        if args.preview_dir:
            fig.savefig(args.preview_dir / f'{filename}.png', dpi=160)
        plt.close(fig)
        print(f'Saved {output / (filename + ".svg")}')


if __name__ == '__main__':
    main()
