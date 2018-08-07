package com.protostar.prostudy.entity;

import java.util.List;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;


@Entity
public class RoleSecEntity {
	@Id
	private Long id;
	@Index
	private String role;
	@Index
	private Long instituteID;
	
	private List<String> modules;
	
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
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public List<String> getModules() {
		return modules;
	}
	public void setModules(List<String> modules) {
		this.modules = modules;
	}
	
	
	
}


