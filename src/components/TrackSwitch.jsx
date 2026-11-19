import { navigate } from '../router.js';
import { useApp } from '../store.jsx';

export default function TrackSwitch({ track, practicalTo, advancedTo, subject = 'track' }) {
  const { up } = useApp();
  const isAdvanced = track === 'advanced';

  return (
    <div className="plan-track-control">
      <span className={!isAdvanced ? 'selected' : ''}>Practical</span>
      <button
        type="button"
        role="switch"
        aria-checked={isAdvanced}
        aria-label={'Advanced ' + subject}
        title={'Switch to ' + (isAdvanced ? 'Practical' : 'Advanced') + ' ' + subject}
        className="plan-track-switch"
        onClick={() => {
          const nextTrack = isAdvanced ? 'practical' : 'advanced';
          up(state => { state.planTrack = nextTrack; });
          navigate(isAdvanced ? practicalTo : advancedTo);
        }}
      >
        <span className="plan-track-thumb" />
      </button>
      <span className={isAdvanced ? 'selected' : ''}>Advanced</span>
    </div>
  );
}
