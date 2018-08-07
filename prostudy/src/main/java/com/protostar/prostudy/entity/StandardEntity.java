package com.protostar.prostudy.entity;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class StandardEntity {
	
	@Id
	private Long id;
	@Index
	private Long instituteID;
	@Index
	private String name;

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getInstituteID() {
		return instituteID;
	}
	public void setInstituteID(Long instituteID) {
		this.instituteID = instituteID;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
}
