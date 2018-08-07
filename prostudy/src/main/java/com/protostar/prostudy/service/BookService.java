package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.prostudy.entity.BookEntity;


@Api(name = "bookService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class BookService {

	@ApiMethod(name = "addBook")
	public void addBook(BookEntity bookEntity) {
		
		Key<BookEntity> now = ofy().save().entity(bookEntity).now();
		
	}

	@ApiMethod(name = "getBooks")
	public List<BookEntity> getBooks() {
		System.out.println("Inside getBooks ");
		return ofy().load().type(BookEntity.class).list();

	}

	@ApiMethod(name = "updateBook")
	public void updateBook(BookEntity usr) {
		Key<BookEntity> now = ofy().save().entity(usr).now();
	}

	@ApiMethod(name = "getBookByID")
	public BookEntity getBookByID(@Named("id") Long id) {
		System.out.println("Inside getBookByID ");
		BookEntity theBook = ofy().load().type(BookEntity.class).id(id).now();
		return theBook;

	}

	@ApiMethod(name = "getBookByStandard")
	public List<BookEntity> getBookByStandard(@Named("standard") String standard) {
		System.out.println("Inside getBookByStandard ");
		List<BookEntity> bookByStandardId = ofy().load().type(BookEntity.class)
				.filter("standard", standard).list();

		return bookByStandardId;
	}

	@ApiMethod(name = "getBooksByInstitute", path = "getBooksByInstitute")
	public List<BookEntity> getBooksByInstitute(
			@Named("instituteID") Long instituteID) {
		System.out.println("inside getBooksByInstitute");
		List<BookEntity> bookList = ofy().load().type(BookEntity.class)
				.filter("instituteID", instituteID).list();
		return bookList;

	}
	
	
}// end of BookService

