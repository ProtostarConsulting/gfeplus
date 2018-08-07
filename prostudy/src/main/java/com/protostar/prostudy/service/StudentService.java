package com.protostar.prostudy.service;
import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.prostudy.entity.StudentEntity;

@Api(name = "studentService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class StudentService {
	
	@ApiMethod(name = "addStudent", path = "addStudent")
	public void addStudent(StudentEntity stud) {
		Key<StudentEntity> now = ofy().save().entity(stud).now();
	}
	
	@ApiMethod(name = "getStudents", path = "getStudents")
	public List<StudentEntity> getStudents() {
		return ofy().load().type(StudentEntity.class).list();
	}
	
	@ApiMethod(name = "getStudentById", path = "getStudentById")
	public StudentEntity getStudentById(@Named("instituteID") Long instituteID) {
		System.out.println("Inside getStudentById ");
		StudentEntity selected = ofy().load()
				.type(StudentEntity.class).id(instituteID).now();
		return selected;
	}

}
