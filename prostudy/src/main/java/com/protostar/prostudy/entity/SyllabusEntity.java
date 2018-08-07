package com.protostar.prostudy.entity;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class SyllabusEntity 
{
	@Id
	private Long id;
	@Index
	private Long instituteID;
	
	@Index
	private String board;
	private String standard;
	private String division;
	
	private String subject;
	private String chapterName;
	private String chapterContent;
	
	public String getDivision() {
		return division;
	}
	public void setDivision(String division) {
		this.division = division;
	}
	public Long getInstituteID() {
		return instituteID;
	}
	public void setInstituteID(Long instituteID) {
		this.instituteID = instituteID;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setBoard(String board) {
		this.board = board;
	}
	public void setStandard(String standard) {
		this.standard = standard;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public Long getId() {
		return id;
	}
	public String getBoard() {
		return board;
	}
	public String getStandard() {
		return standard;
	}
	public String getSubject() {
		return subject;
	}
	public String getChapterName() {
		return chapterName;
	}
	public String getChapterContent() {
		return chapterContent;
	}
	public void setChapterName(String chapterName) {
		this.chapterName = chapterName;
	}
	public void setChapterContent(String chapterContent) {
		this.chapterContent = chapterContent;
	}
	
	
}
