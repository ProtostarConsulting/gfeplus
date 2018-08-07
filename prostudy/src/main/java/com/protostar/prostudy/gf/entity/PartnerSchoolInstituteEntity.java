package com.protostar.prostudy.gf.entity;

import com.googlecode.objectify.annotation.Cache;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Index;
import com.googlecode.objectify.annotation.OnSave;
import com.protostar.prostudy.entity.Address;
import com.protostar.prostudy.entity.BaseEntity;

@Entity
@Cache
public class PartnerSchoolInstituteEntity extends BaseEntity {
	private String instituteName;
	@Index
	private Address address;
	
	@Index
	private Long instituteID;
	
	@Index
	private String[] schoolInstituteNameIndex;
	
	@OnSave
	public void createSchoolInstituteNameIndex() {
		schoolInstituteNameIndex = instituteName.trim().split(" ");
	}
	
	public String getInstituteName() {
		return instituteName;
	}

	public void setInstituteName(String instituteName) {
		this.instituteName = instituteName;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public String[] getSchoolInstituteNameIndex() {
		return schoolInstituteNameIndex;
	}

	public void setSchoolInstituteNameIndex(String[] schoolInstituteNameIndex) {
		this.schoolInstituteNameIndex = schoolInstituteNameIndex;
	}

	public Long getInstituteID() {
		return instituteID;
	}

	public void setInstituteID(Long instituteID) {
		this.instituteID = instituteID;
	}

}