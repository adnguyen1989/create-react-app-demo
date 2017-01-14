import React, { Component, PropTypes } from 'react';

class CourseSelect extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      department: null,
      course: null,
      courses: [],
      _loading: false
    }
    this.onSelectDepartment = this.onSelectDepartment.bind(this)
    this.onSelectCourse = this.onSelectCourse.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      department: nextProps.department,
      course: nextProps.course
    })
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      console.log(error);
      throw error;
    }
  }

  parseJSON(response) {
    return response.json();
  }

  onSelectDepartment(evt){
    const department = evt.target.value;
    this.setState({
      department: department,
      course: null
    })
    this.props.onChange({name: 'department', value: department})
    this.props.onChange({name: 'course', value: null})
    if (department) this.fetch(department)
  }

  onSelectCourse(evt){
    const course = evt.target.value;
    this.props.onChange({name: 'course', value: course})
    this.setState({
      course: course
    })
  }

  fetch(department){
    this.setState({_loading:true, courses: []})
    fetch('http://accounts.dev/api/courses/?department='+department, {
      headers: {
        Accept: 'application/json',
      }
    }).then(this.checkStatus)
    .then(this.parseJSON)
    .then((response)=>{
      this.setState({_loading:false, courses: response.courses})
    })
  }

  renderDepartmentSelect(){
    return(
      <select onChange={this.onSelectDepartment} value={this.state.department || ''}>
        <option value="">What department?</option>
        <option value="core">Node Core</option>
        <option value="elective">Node Elective</option>
      </select>
    )
  }

  renderCourseSelect(){
    if (this.state._loading){
      return <img alt='loading' src='/img/loading.gif' />;
    }

    if (!this.state.department || !this.state.courses.length) return <span />;

    return (
      <select
        onChange={this.onSelectCourse}
        value={this.state.course || ''}
      >

        { [
          <option value='' key='course-none'>
            Which course?
          </option>,

          ...this.state.courses.map((course, i) => (
            <option value={course} key={i}>
              {course}
            </option>
          )),
        ] }
      </select>
    );
  }

  render () {
    return (
      <div>
        {this.renderDepartmentSelect()}
        <br />
        {this.renderCourseSelect()}
      </div>
    );
  }
}

export default CourseSelect;
