package com.protostar.prostudy.entity;

import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

public class SelectedStudents {

	@Id
	@Index
	private long id;
	
	private String address;
	private String contact;
	private String division;
	private String email_id;
	private String firstName;
	private long instituteID;
	private boolean isGoogleUser;
	private String lastName;
	private String password;
	private String prn;
	private String role;
	private String schoolName;
	private String standard;
	private long selectedExam;
	public long getSelectedExam() {
		return selectedExam;
	}
	public void setSelectedExam(long selectedExam) {
		this.selectedExam = selectedExam;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getDivision() {
		return division;
	}
	public void setDivision(String division) {
		this.division = division;
	}
	public String getEmail_id() {
		return email_id;
	}
	public void setEmail_id(String email_id) {
		this.email_id = email_id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public long getInstituteID() {
		return instituteID;
	}
	public void setInstituteID(long instituteID) {
		this.instituteID = instituteID;
	}
	public boolean isGoogleUser() {
		return isGoogleUser;
	}
	public void setGoogleUser(boolean isGoogleUser) {
		this.isGoogleUser = isGoogleUser;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPrn() {
		return prn;
	}
	public void setPrn(String prn) {
		this.prn = prn;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getSchoolName() {
		return schoolName;
	}
	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}
	public String getStandard() {
		return standard;
	}
	public void setStandard(String standard) {
		this.standard = standard;
	}

	
}
