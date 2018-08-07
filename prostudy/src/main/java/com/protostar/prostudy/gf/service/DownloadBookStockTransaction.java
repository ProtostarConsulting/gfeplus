package com.protostar.prostudy.gf.service;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.protostar.prostudy.gf.entity.GFBookEntity;
import com.protostar.prostudy.gf.entity.GFBookTransactionEntity;

/**
 * Servlet implementation class DownloadBookStockTransaction
 */
public class DownloadBookStockTransaction extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public DownloadBookStockTransaction() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		System.out.println("hi i am download servlet");
		// TODO Auto-generated method stub
		if (request.getRemoteHost().contains("localhost")
				|| request.getRemoteHost().contains("127.0.0.1")) {
			response.addHeader("Access-Control-Allow-Origin", "*");
			response.addHeader("Access-Control-Allow-Methods",
					"GET,PUT,POST,DELETE");
			response.addHeader("Access-Control-Allow-Headers", "Content-Type");
		}
		
		String bookTransaction = request
				.getParameter("BookStockTransactionByInstituteId");
		long InstituteId = Long.parseLong(bookTransaction);

		GFBookStockService gfBookStockService = new GFBookStockService();

		Date date = new Date();
		String DATE_FORMAT = "dd/MMM/yyyy";
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);

		List<GFBookTransactionEntity> list1 = gfBookStockService
				.getGFBookStockTransactionByInstituteId(InstituteId);

		try {

			response.setContentType("text/csv");
			response.setHeader(
					"Content-Disposition",
					"attachment; filename=BookTransactionData_"
							+ sdf.format(date) + ".csv");

			ServletOutputStream outputStream = response.getOutputStream();
			OutputStreamWriter writer = new OutputStreamWriter(outputStream);

			
			writer.append("Standard	");
			writer.append(',');
			writer.append("Book Name");
			writer.append(',');			
			writer.append("Medium");
			writer.append(',');
			writer.append("Book Qty");
			writer.append(',');
			writer.append("Transaction Type");
			writer.append(',');
			writer.append("Transaction Date");
			writer.append(',');

			writer.append(System.lineSeparator());

			for (int i = 0; i < list1.size(); i++) {

				GFBookTransactionEntity bookTrans = list1.get(i);				
				GFBookEntity book = bookTrans.getBook();
				
				if (book != null) {
					String standard = book.getStandard();
					writer.append(standard);
					writer.append(',');
					
					String bookName = book.getBookName();
					writer.append(bookName);
					writer.append(',');					

					String medium = book.getBookMedium();
					writer.append(medium);
					writer.append(',');
					
					int bookQty = bookTrans.getBookQty();
					writer.append(Integer.toString(bookQty));
					writer.append(',');
					
					String transactionType = bookTrans.getTransactionType();
					writer.append(transactionType);
					writer.append(',');
					
					String transactionDate = sdf.format(bookTrans
							.getTransactionDate());
					writer.append(transactionDate);
					writer.append(',');

					writer.append(System.lineSeparator());

				} else {
					continue;
				}

			}

			writer.close();

		} catch (Exception e) {
			throw new ServletException(
					"Error Generateing Excel Sheet for DownloadBookStockTransaction. ",
					e);
		}

	}

}
