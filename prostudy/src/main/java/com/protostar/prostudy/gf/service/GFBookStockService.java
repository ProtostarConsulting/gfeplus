package com.protostar.prostudy.gf.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.ArrayList;
import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.Ref;
import com.protostar.prostudy.gf.entity.GFBookEntity;
import com.protostar.prostudy.gf.entity.GFBookStockEntity;
import com.protostar.prostudy.gf.entity.GFBookTransactionEntity;

@Api(name = "gfBookStockService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.gf.service", ownerName = "com.protostar.prostudy.gf.service", packagePath = ""))
public class GFBookStockService {

	@ApiMethod(name = "addGFBook", path = "addGFBook")
	public GFBookEntity addGFBook(GFBookEntity gfBookEntity) {

		/*
		 * if (gfBookEntity.getFlag() != null) {
		 * ofy().save().entity(gfBookEntity).now(); } String bookname =
		 * gfBookEntity.getBookName(); String bookmedium =
		 * gfBookEntity.getBookMedium();
		 * 
		 * GFBookEntity foundBook = ofy().load().type(GFBookEntity.class)
		 * .filter("bookName", bookname).filter("bookMedium", bookmedium)
		 * .first().now(); if (foundBook != null) { return gfBookEntity; } else
		 * { ofy().save().entity(gfBookEntity).now(); return gfBookEntity; }
		 */

		Key<GFBookEntity> now = ofy().save().entity(gfBookEntity).now();
		if (gfBookEntity.getId() == null) {
			gfBookEntity.setId(now.getId());
		}
		return gfBookEntity;
	}

	@ApiMethod(name = "addTranAfterAddBook", path = "addTranAfterAddBook")
	public void addTranAfterAddBook(GFBookEntity gfBookEntity) {

		long bID = gfBookEntity.getId();
		GFBookStockEntity filteredbook = ofy()
				.load()
				.type(GFBookStockEntity.class)
				.filter("book", Ref.create(Key.create(GFBookEntity.class, bID)))
				.first().now();

		if (filteredbook == null) {
			GFBookStockEntity gfBookStockEntity = new GFBookStockEntity();
			gfBookStockEntity.setBook(gfBookEntity);
			gfBookStockEntity.setBookQty(gfBookEntity.getBookQty());
			gfBookStockEntity.setFeedStockDate(gfBookEntity.getBookFeedDate());
			gfBookStockEntity.setInstituteID(gfBookEntity.getInstituteID());

			ofy().save().entity(gfBookStockEntity).now();
		}

		GFBookTransactionEntity newTransaction = new GFBookTransactionEntity();
		newTransaction.setBook(gfBookEntity);
		newTransaction.setInstituteID(gfBookEntity.getInstituteID());
		newTransaction.setTransactionType("Cr");
		newTransaction.setTransactionDate(gfBookEntity.getBookFeedDate());
		newTransaction.setBookQty(gfBookEntity.getBookQty());

		ofy().save().entity(newTransaction).now();
	}

	@ApiMethod(name = "getGFBookByInstituteId", path = "getGFBookByInstituteId")
	public List<GFBookEntity> getGFBookByInstituteId(
			@Named("instituteID") long instituteID) {

		List<GFBookEntity> list = ofy().load().type(GFBookEntity.class).list();

		return list;

	}

	@ApiMethod(name = "getGFBookStockTransactionByInstituteId", path = "getGFBookStockTransactionByInstituteId")
	public List<GFBookTransactionEntity> getGFBookStockTransactionByInstituteId(
			@Named("instituteID") long instituteID) {

		List<GFBookTransactionEntity> list = ofy().load()
				.type(GFBookTransactionEntity.class).list();
		List<GFBookTransactionEntity> fitleredList = new ArrayList<GFBookTransactionEntity>();
		// Filter only Cr List
		for (GFBookTransactionEntity bookTxnRecord : list) {
			if (!"Cr".equalsIgnoreCase(bookTxnRecord.getTransactionType())) {
				continue;
			}
			fitleredList.add(bookTxnRecord);
		}

		return fitleredList;

	}

	@ApiMethod(name = "getGFBookById", path = "getGFBookById")
	public GFBookEntity getGFBookById(@Named("id") long studID) {

		GFBookEntity book = ofy().load().type(GFBookEntity.class).id(studID)
				.now();

		return book;

	}

	@ApiMethod(name = "addGFBookStock", path = "addGFBookStock")
	public void addGFBookStock(GFBookStockEntity gfBookStockEntity) {

		/* Start To Update the Book Transaction Entity */

		GFBookTransactionEntity newTransaction = new GFBookTransactionEntity();
		newTransaction.setInstituteID(gfBookStockEntity.getInstituteID());
		newTransaction.setTransactionType("Cr");
		newTransaction.setBook(gfBookStockEntity.getBook());
		newTransaction.setTransactionDate(gfBookStockEntity.getFeedStockDate());
		newTransaction.setBookQty(gfBookStockEntity.getBookQty());
		ofy().save().entity(newTransaction).now();

		/* END Update the Book Transaction Entity */

		/* For increse qty on Book Entity in GFBookEntity */

		long bID = gfBookStockEntity.getBook().getId();

		GFBookEntity book = ofy().load().type(GFBookEntity.class).id(bID).now();

		int totQty = gfBookStockEntity.getBookQty() + book.getBookQty();
		book.setBookQty(totQty);

		ofy().save().entity(book).now();

		/* END Book Entity increse Qty in GFBookEntity */

		/* For Add and Increse qty in GFBookStockEntity Entity */

		GFBookStockEntity filteredbook = ofy()
				.load()
				.type(GFBookStockEntity.class)
				.filter("book", Ref.create(Key.create(GFBookEntity.class, bID)))
				.first().now();

		if (filteredbook != null) {

			filteredbook.setBookQty(totQty);
			ofy().save().entity(filteredbook);

		} else {
			gfBookStockEntity.setBookQty(totQty);
			ofy().save().entity(gfBookStockEntity).now();
		}

		/* END Book Entity increse Qty in GFBookStockEntity */
	}

	@ApiMethod(name = "getGFBookStockByInstituteId", path = "getGFBookStockByInstituteId")
	public List<GFBookStockEntity> getGFBookStockByInstituteId(
			@Named("instituteID") long instituteID) {

		List<GFBookStockEntity> list = ofy().load()
				.type(GFBookStockEntity.class).list();

		return list;

	}

	@ApiMethod(name = "getGFBookStockById", path = "getGFBookStockById")
	public GFBookStockEntity getGFBookStockById(@Named("id") long bookID) {

		GFBookStockEntity book = ofy().load().type(GFBookStockEntity.class)
				.id(bookID).now();

		return book;

	}
}
