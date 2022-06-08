import Directory from '../../components/directory/directory.component.jsx';
import categories from '../../assets/categories.json';

const Home = () => {
  return <Directory categories={categories} />;
};

export default Home;
