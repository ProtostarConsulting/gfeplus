package com.protostar.prostudy.entity;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class SubjectEntity {

	@Id
	private Long id;
	@Index
	private Long divisionID;
	private String name;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getDivisionID() {
		return divisionID;
	}
	public void setDivisionID(Long divisionID) {
		this.divisionID = divisionID;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}



}
