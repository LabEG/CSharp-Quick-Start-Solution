import {match, RouteComponentProps} from 'react-router';
import * as H from 'history';

export class RouteProps<P> implements RouteComponentProps<P> {
    public match: match<P>;
    public location: H.Location;
    public history: H.History;
}
