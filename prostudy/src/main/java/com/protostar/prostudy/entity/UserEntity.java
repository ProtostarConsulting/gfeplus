package com.protostar.prostudy.entity;

import java.util.List;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.protostar.prostudy.gf.entity.PartnerSchoolEntity;
import com.protostar.prostudy.gf.entity.PartnerSchoolInstituteEntity;

@Entity
public class UserEntity {

	@Id
	@Index
	private Long id;
	private String firstName;
	private String lastName;
	private String address;
	private String contact;
	@Index
	private String role;
	@Index
	private String email_id;
	@Index
	private String PRN;
	private Boolean isGoogleUser;

	private String password;
	@Index
	private String standard;
	@Index
	private String division;
	private List<String> authority;
	private String authorizations;

	@Index
	private Long instituteID;
	private String schoolName;
	private String status = "active";
	
	private List<SelectedStudents> selectedStudents;
	@Index
	private long selectedExam;

	@Index
	private Ref<PartnerSchoolEntity> school;
	
	@Index
	private Ref<PartnerSchoolInstituteEntity> schoolInstitute;
	
	public PartnerSchoolEntity getSchool() {
		return school == null ? null : school.get();
	}

	public void setSchool(PartnerSchoolEntity school) {
		this.school = Ref.create(school);
	}
	
	public PartnerSchoolInstituteEntity getSchoolInstitute() {
		return schoolInstitute == null ? null : schoolInstitute.get();
	}

	public void setSchoolInstitute(PartnerSchoolInstituteEntity schoolInstitute) {
		this.schoolInstitute = Ref.create(schoolInstitute);
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<String> getAuthority() {
		return authority;
	}

	public void setAuthority(List<String> authority) {
		this.authority = authority;
	}

	public long getSelectedExam() {
		return selectedExam;
	}

	public void setSelectedExam(long selectedExam) {
		this.selectedExam = selectedExam;
	}

	

	public List<SelectedStudents> getSelectedStudents() {
		return selectedStudents;
	}

	public void setSelectedStudents(List<SelectedStudents> selectedStudents) {
		this.selectedStudents = selectedStudents;
	}

	public String getSchoolName() {
		return schoolName;
	}

	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}

	private List<PracticeExamEntity> myExams;
	private List<BookEntity> myBooks;

	public Boolean getIsGoogleUser() {
		return isGoogleUser;
	}

	public void setIsGoogleUser(Boolean isGoogleUser) {
		this.isGoogleUser = isGoogleUser;
	}

	public List<PracticeExamEntity> getMyExams() {
		return myExams;
	}

	public void setMyExams(List<PracticeExamEntity> myExams) {
		this.myExams = myExams;
	}

	public List<BookEntity> getMyBooks() {
		return myBooks;
	}

	public void setMyBooks(List<BookEntity> myBooks) {
		this.myBooks = myBooks;
	}

	public String getDivision() {
		return division;
	}

	public void setDivision(String division) {
		this.division = division;
	}

	public String getPRN() {
		return PRN;
	}

	public void setPRN(String pRN) {
		PRN = pRN;
	}

	public String getStandard() {
		return standard;
	}

	public void setStandard(String standard) {
		this.standard = standard;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getEmail_id() {
		return email_id;
	}

	public void setEmail_id(String email_id) {
		this.email_id = email_id;
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

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Long getInstituteID() {
		return instituteID;
	}

	public void setInstituteID(Long instituteID) {
		this.instituteID = instituteID;
	}

	public String getAuthorizations() {
		return authorizations;
	}

	public void setAuthorizations(String authorizations) {
		this.authorizations = authorizations;
	}

}
