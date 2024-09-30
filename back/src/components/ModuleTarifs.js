import { React, useEffect, useState } from 'react';
import BlockTarif from './BlockTarif';

const ModuleTarifs = (props) => {

    const {tarifs} = props;
    const [prix,setPrix] = useState(tarifs);

    return(
        <>
        {
           prix.map( (item,i) => (
                <BlockTarif key={`${item.secteur}-${item.id}`} item={item} />
                )
            )
        }
        </>
    );

}
export default ModuleTarifs;