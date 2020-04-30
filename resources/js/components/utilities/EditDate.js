import { React, Component} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class EditDate extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            startDate: new Date()
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    };

    render() {
        return (
            <DatePicker
                selected={this.state.date}
                onChange={this.handleChange}
                showTimeSelect
                dateFormat="Pp"
            />
        );
    }
}
/*
class EditDate extends React.Component {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
        />
    );
};
*/
export default EditDate;