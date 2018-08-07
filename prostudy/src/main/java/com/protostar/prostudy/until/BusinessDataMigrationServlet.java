package com.protostar.prostudy.until;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.googlecode.objectify.cmd.QueryKeys;
import com.protostar.prostudy.gf.entity.GFBookEntity;
import com.protostar.prostudy.gf.entity.GFBookStockEntity;
import com.protostar.prostudy.gf.entity.GFBookTransactionEntity;
import com.protostar.prostudy.gf.entity.PartnerSchoolEntity;

public class BusinessDataMigrationServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public BusinessDataMigrationServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		String servletMsg = "Migration Done!";

		// // Re-set Book Qty to 0
		// List<GFBookStockEntity> list = ofy().load()
		// .type(GFBookStockEntity.class).list();
		// for (GFBookStockEntity gfBookStockEntity : list) {
		// gfBookStockEntity.setBookQty(0);
		// }
		//
		// ofy().save().entities(list).now();
		// List<GFBookEntity> list2 =
		// ofy().load().type(GFBookEntity.class).list();
		// for (GFBookEntity gfBookEntity : list2) {
		// gfBookEntity.setBookQty(0);
		// }
		//
		// ofy().save().entities(list2).now();
		//
		// // Delete All Old Book Transactions
		//
		// QueryKeys<GFBookTransactionEntity> keys = ofy().load()
		// .type(GFBookTransactionEntity.class).keys();
		//
		// ofy().delete().keys(keys).now();

		// Touch all schools

		List<PartnerSchoolEntity> list = ofy().load()
				.type(PartnerSchoolEntity.class).list();

		ofy().save().entities(list);

		PrintWriter writer = response.getWriter();
		writer.write(servletMsg);
		writer.flush();
	}

}
