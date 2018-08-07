package com.protostar.prostudy.entity;

import java.util.List;

import com.google.appengine.api.blobstore.BlobstoreServicePb.BlobstoreService;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class BookEntity {

	@Id
	private Long id;
	
	@Index          
	private Long instituteID;
	private String book_name;
	private String author;
	private String board;
	@Index
	private String standard;
	private String division;
	private String subject;
	private List<ChapterEntity> chapters;
	private List<CommentEntity> comment;
	private Integer likes;	
	private Integer dislikes;
	private Boolean isPDF;
	private String blobKey;
	
	
	public String getBlobKey() {
		return blobKey;
	}
	public void setBlobKey(String blobKey) {
		this.blobKey = blobKey;
	}
	public Integer getLikes() {
		return likes;
	}
	public void setLikes(Integer likes) {
		this.likes = likes;
	}

	public Integer getDislikes() {
		return dislikes;
	}

	public void setDislikes(Integer dislikes) {
		this.dislikes = dislikes;
	}

	public Boolean getIsPDF() {
		return isPDF;
	}
	public void setIsPDF(Boolean isPDF) {
		this.isPDF = isPDF;
	}
	public List<CommentEntity> getComment() {
		return comment;
	}

	public void setComment(List<CommentEntity> comment) {
		this.comment = comment;
	}

	public String getDivision() {
		return division;
	}

	public void setDivision(String division) {
		this.division = division;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	
	public Long getInstituteID() {
		return instituteID;
	}

	public void setInstituteID(Long instituteID) {
		this.instituteID = instituteID;
	}

	
	public List<ChapterEntity> getChapters() {
		return chapters;
	}

	public void setChapters(List<ChapterEntity> chapters) {
		this.chapters = chapters;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	
	public String getBook_name() {
		return book_name;
	}

	public void setBook_name(String book_name) {
		this.book_name = book_name;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getBoard() {
		return board;
	}

	public void setBoard(String board) {
		this.board = board;
	}

	public String getStandard() {
		return standard;
	}

	public void setStandard(String standard) {
		this.standard = standard;
	}




}// end of BookEntity

