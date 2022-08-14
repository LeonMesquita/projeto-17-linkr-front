import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function TimelineTitleSkeleton(){

    return(
        <p><Skeleton  count={1} baseColor="#333333" highlightColor="#272727" width="100%" height="64px" borderRadius="30px" duration={2}/></p>
    )
};

