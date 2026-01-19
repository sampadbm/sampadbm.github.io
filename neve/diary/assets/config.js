/**
 * Centralized configuration for diary application
 */

const DiaryConfig = {
    // Color palette
    colors: {
        textPrimary: '#1e1b16',
        textSecondary: '#6c645c',
        bgPrimary: '#f6f2ec',
        bgSecondary: '#efe9e0',
        border: '#d8cfc3',
        accent: '#2d4a3e',
        highlight: '#fff8e6'
    },

    // Mood configuration
    moods: {
        happy: {
            bg: '#e8f4e8',
            text: '#2d4a3e',
            label: 'Happy'
        },
        reflective: {
            bg: '#e8e8f4',
            text: '#2d2d4a',
            label: 'Reflective'
        },
        anxious: {
            bg: '#f4e8e8',
            text: '#4a2d2d',
            label: 'Anxious'
        },
        hopeful: {
            bg: '#f4f4e8',
            text: '#4a4a2d',
            label: 'Hopeful'
        },
        grateful: {
            bg: '#e8f4f4',
            text: '#2d4a4a',
            label: 'Grateful'
        },
        excited: {
            bg: '#fff4e8',
            text: '#4a3e2d',
            label: 'Excited'
        },
        calm: {
            bg: '#e8f0f4',
            text: '#2d3e4a',
            label: 'Calm'
        },
        tired: {
            bg: '#f0e8f4',
            text: '#3e2d4a',
            label: 'Tired'
        }
    },

    // Helper function to get mood color
    getMoodColor(moodName) {
        const normalizedMood = moodName.toLowerCase().replace(/\s+/g, '-');
        const moodKey = Object.keys(this.moods).find(key =>
            key === normalizedMood || normalizedMood.includes(key)
        );
        return moodKey ? this.moods[moodKey].bg : this.colors.bgSecondary;
    },

    // Typography
    fonts: {
        serif: "'EB Garamond', Georgia, 'Times New Roman', serif",
        display: "'Cormorant Garamond', Georgia, serif"
    }
};

// Export for use in other modules
window.DiaryConfig = DiaryConfig;
