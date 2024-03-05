import { Link, Outlet } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Routes = () => {
  return (
    <div>
      <Link to={'/'}>
        <Button>О приложении</Button>
      </Link>
      <br />
      <Link to={'/quotes-react-query'}>
        <Button>Котировки на rect query</Button>
      </Link>
      <Link to={'/quotes-mobix'}>
        <Button>Котировки на mobix</Button>
      </Link>
      <Outlet />
    </div>
  );
};

export default Routes;
