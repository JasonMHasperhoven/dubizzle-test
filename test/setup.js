import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '../src/initializers/Array.findAndReplace';

Enzyme.configure({ adapter: new Adapter() });
