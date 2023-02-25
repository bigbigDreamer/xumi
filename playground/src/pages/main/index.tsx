import './index.less';
import { useNavigate, useOutlet } from '@montagejs/pangu';

function Main() {
    const navigate = useNavigate();
    const outlet = useOutlet();

    const handleClick = () => {
        navigate('/about');
    };
    const handleChildClick = () => {
        navigate('/inner');
    };

    return (
        <div className="main-page">
            <h3>hello 欢迎使用ak，点击按钮跳转about页面</h3>
            {outlet}
            <button onClick={handleChildClick}>点击跳转子陆游</button>
        </div>
    );
}
export default Main;
