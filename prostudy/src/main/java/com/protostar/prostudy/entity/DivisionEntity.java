package com.protostar.prostudy.entity;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;


@Entity
public class DivisionEntity {

	@Id
	private Long id;
	@Index
	private Long standardID;
	@Index
	private String name;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getStandardID() {
		return standardID;
	}
	public void setStandardID(Long standardID) {
		this.standardID = standardID;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}	
}
