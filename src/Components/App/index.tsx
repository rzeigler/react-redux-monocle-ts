import { connect } from 'react-redux';
import App, {Props} from './component';
import { squadrons, AppState } from 'src/Data/Types';

/**
 * Notice that Props is parameterized in AppState.
 * Because we are working in terms of lenses, every other component besides App
 * may be generic in the root type.
 * The composition of lenses defines hierarchy rather than the state.
 */
export function mapStateToProps(state: AppState): Props<AppState> {
    return {
        squadronsLens: squadrons,
        squadrons: squadrons.get(state)
    };
}

export default connect(mapStateToProps)(App);