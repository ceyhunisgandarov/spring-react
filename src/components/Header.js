import React, {Comment, Component} from 'react';
import Logo from '../../images/react-logo.png'

class Header extends Component {
    constructor () {
        super();
        this.state = {
            projeNo:"proje 1"
        }
    }

    render() {
        return (
            <div>
                <img src={Logo} />
                <p>{this.state.projeNo}</p>
            </div>
        )
    }
}
 
export default Header;