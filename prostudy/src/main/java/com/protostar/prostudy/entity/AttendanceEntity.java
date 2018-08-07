package com.protostar.prostudy.entity;


import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class AttendanceEntity {
	
	@Id
	private Long id;
	private Long studID; 
	private String firstName;
	private String lastName;
	@Index          
	private Long instituteID;
	@Index  
	private String standard;
	@Index 
	private String division;
	@Index 
	private String subject;
	private String date;
	private Boolean attendance;
	
	
	public String getDivision() {
		return division;
	}
	public void setDivision(String division) {
		this.division = division;
	}
	
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	public Boolean getAttendance() {
		return attendance;
	}
	public String getStandard() {
		return standard;
	}
	public void setStandard(String standard) {
		this.standard = standard;
	}
	public void setAttendance(Boolean attendance) {
		this.attendance = attendance;
	}
	
	public Long getInstituteID() {
		return instituteID;
	}
	public void setInstituteID(Long instituteID) {
		this.instituteID = instituteID;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getStudID() {
		return studID;
	}
	public void setStudID(Long studID) {
		this.studID = studID;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	

}
