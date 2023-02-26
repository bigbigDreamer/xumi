import './index.less';
import { useNavigate, useOutlet } from '@montagejs/pangu';

function Main() {
    const navigate = useNavigate();
    const outlet = useOutlet();

    // const handleClick = () => {
    //     navigate('/about');
    // };
    const handleChildClick = () => {
        navigate('/inner');
    };

    return (
        <div className="main-page">
            <h1>Hello 须弥（XuMi App）</h1>
            {outlet}
        </div>
    );
}
export default Main;
