import React from 'react';

import { StarshipList } from '../sw_components';
import { withRouter } from 'react-router-dom';

const StarshipsPage = ({ history }) => {

    return (
        <StarshipList 
            onItemSelected = {(itemId) => {
                history.push(itemId);
            }} />
    );
};

export default withRouter(StarshipsPage);