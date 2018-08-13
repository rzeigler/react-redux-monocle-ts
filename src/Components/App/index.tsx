import { connect } from 'react-redux';
import App, {Props} from './component';
import { squadrons, AppState } from 'src/Data/Types';

export function mapStateToProps(state: AppState): Props<AppState> {
    return {
        squadronsLens: squadrons,
        squadrons: squadrons.get(state)
    };
}

export default connect(mapStateToProps)(App);