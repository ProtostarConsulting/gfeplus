package com.protostar.prostudy.entity;

import java.util.Date;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public abstract class BaseEntity {

	@Id
	private Long id;
	@Index
	Ref<InstituteEntity> institute;
	private Date createdDate;
	private Date modifiedDate;	
	private String modifiedBy;
			
	public BaseEntity() {
		super();
	}
	
	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	public String getModifiedBy() {
		return modifiedBy;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}


	public InstituteEntity getInstitute() {
		return institute== null ? null : institute.get();
	}

	public void setInstitute(InstituteEntity institute) {
		this.institute = Ref.create(institute);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}