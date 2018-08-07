package com.protostar.prostudy.service;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.protostar.prostudy.entity.QuestionEntity;

/**
 * Servlet implementation class DownloadQuestionListServlet
 */
public class DownloadQuestionListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DownloadQuestionListServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#service(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("inside DownloadQuestionListServlet ");
		

		Long insId = Long.parseLong(request.getParameter("InstituteId"));

		System.out.println("insid===" + insId);

		QuestionService quesService = new QuestionService();
		
		Date date = new Date();
		String DATE_FORMAT = "dd/MMM/yyyy";
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT); 
		

		
		List<QuestionEntity> QuesEntity = quesService.getQuestionsByInstitute(insId);
		
		OutputStream out = null;
	
		try {

			response.setContentType("text/csv");

			response.setHeader("Content-Disposition",
					"attachment; filename=QuestionData_" + sdf.format(date)
							+ ".csv");

			ServletOutputStream outputStream = response.getOutputStream();
			OutputStreamWriter writer = new OutputStreamWriter(outputStream);

			
			writer.append("board");
			writer.append(',');
			writer.append("standard");
			writer.append(',');
			writer.append("division");
			writer.append(',');
			writer.append("description");
			writer.append(',');
			writer.append("category");
			writer.append(',');
			writer.append("note");
			writer.append(',');
			writer.append("option1");
			writer.append(',');
			writer.append("option2");
			writer.append(',');
			writer.append("option3");
			writer.append(',');
			writer.append("option4");
			writer.append(',');
			writer.append("correctAns");
			writer.append(',');
		
			writer.append(System.lineSeparator());

			for (int i = 0; i < QuesEntity.size(); i++) {
				
				writer.append(QuesEntity.get(i).getBoard());
				writer.append(',');

				writer.append(QuesEntity.get(i).getStandard());
				writer.append(',');
				writer.append(QuesEntity.get(i).getDivision());
				writer.append(',');
				writer.append(QuesEntity.get(i).getDescription());
				writer.append(',');
				writer.append(QuesEntity.get(i).getCategory());
				writer.append(',');
				writer.append(QuesEntity.get(i).getNote());
				writer.append(',');
				writer.append(QuesEntity.get(i).getOption1());
				writer.append(',');
				writer.append(QuesEntity.get(i).getOption2());
				writer.append(',');
				writer.append(QuesEntity.get(i).getOption3());
				writer.append(',');
				writer.append(QuesEntity.get(i).getOption4());
				writer.append(',');
				writer.append(QuesEntity.get(i).getCorrectAns());
				writer.append(',');
				
				writer.append(System.lineSeparator());
			}

			writer.close();

		} catch (Exception e) {
			throw new ServletException("Exception in DownloadQuestionList Servlet", e);
		} finally {
			if (out != null)
				out.close();
		}
		
		
		
		
		
		
	}

}
