package com.protostar.prostudy.gf.entity;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Cache;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Index;
import com.protostar.prostudy.entity.BaseEntity;
import com.protostar.prostudy.entity.UserEntity;

@Entity
@Cache
public class GFStudentEntity extends BaseEntity {

	/*
	 * @Id private Long id;
	 */
	private String fName;
	private String mName;
	private String lName;
	@Index
	private String standard;
	private String mediumOfAnswer;
	private String gender;
	@Index
	private long instituteID;
	private String prn;
	private String role;

	private Ref<PartnerSchoolEntity> school;
	private Ref<UserEntity> user;

	public long getInstituteID() {
		return instituteID;
	}

	public void setInstituteID(long instituteID) {
		this.instituteID = instituteID;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getPrn() {
		return prn;
	}

	public void setPrn(String prn) {
		this.prn = prn;
	}

	/*
	 * public Long getId() { return id; } public void setId(Long id) { this.id =
	 * id; }
	 */
	public String getfName() {
		return fName;
	}

	public void setfName(String fName) {
		this.fName = fName;
	}

	public String getmName() {
		return mName;
	}

	public void setmName(String mName) {
		this.mName = mName;
	}

	public String getlName() {
		return lName;
	}

	public void setlName(String lName) {
		this.lName = lName;
	}

	public String getStandard() {
		return standard;
	}

	public void setStandard(String standard) {
		this.standard = standard;
	}

	public String getMediumOfAnswer() {
		return mediumOfAnswer;
	}

	public void setMediumOfAnswer(String mediumOfAnswer) {
		this.mediumOfAnswer = mediumOfAnswer;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public PartnerSchoolEntity getSchool() {
		return school == null ? null : school.get();
	}

	public void setSchool(PartnerSchoolEntity school) {
		this.school = Ref.create(school);
	}

	public UserEntity getUser() {
		return user == null? null: user.get();
	}

	public void setUser(UserEntity user) {
		this.user = Ref.create(user);
	}

}
