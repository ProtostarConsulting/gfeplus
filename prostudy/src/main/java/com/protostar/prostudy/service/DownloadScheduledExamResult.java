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

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

import com.protostar.prostudy.entity.ScheduledExamResultEntity;
import com.protostar.prostudy.entity.ScheduledQuestionEntity;

/**
 * Servlet implementation class DownloadScheduledExamResult
 */
public class DownloadScheduledExamResult extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DownloadScheduledExamResult() {
        super();
        // TODO Auto-generated constructor stub
    }
     

    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("inside DownloadScheduledExamResult ");
		

		Long selectedExamId = Long.parseLong(request.getParameter("selectedExamId"));

		System.out.println("insid===" + selectedExamId);

		
		ScheduledExamResultService resultService = new ScheduledExamResultService();
		
		Date date = new Date();
		String DATE_FORMAT = "dd/MMM/yyyy";
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT); 
		

		
		List<ScheduledExamResultEntity> ExamResEntity = resultService.getScheduledExamResultListByExamId(selectedExamId);
		
		OutputStream out = null;
	
		try {

			response.setContentType("text/csv");

			response.setHeader("Content-Disposition",
					"attachment; filename=ScheduledExamResultData_" + sdf.format(date)
							+ ".csv");

			ServletOutputStream outputStream = response.getOutputStream();
			OutputStreamWriter writer = new OutputStreamWriter(outputStream);

			
			
			writer.append("examTitle");
			writer.append(',');					
			writer.append("email_id");
			writer.append(',');
			writer.append("firstName");
			writer.append(',');
			writer.append("lastName");
			writer.append(',');
			writer.append("startTime");
			writer.append(',');
			writer.append("endTime");
			writer.append(',');		
			writer.append("score");
			writer.append(',');
			
			writer.append(System.lineSeparator());

			for (int i = 0; i < ExamResEntity.size(); i++) {
				
				
				writer.append(ExamResEntity.get(i).getExamTitle());
				writer.append(',');			
				writer.append(ExamResEntity.get(i).getEmail_id());
				writer.append(',');
				writer.append(ExamResEntity.get(i).getFirstName());
				writer.append(',');
				writer.append(ExamResEntity.get(i).getLastName());
				writer.append(',');
				writer.append(ExamResEntity.get(i).getStartTime());
				writer.append(',');
				writer.append(ExamResEntity.get(i).getEndTime());
				writer.append(',');
				writer.append(ExamResEntity.get(i).getScore());
				writer.append(',');
				
				writer.append(System.lineSeparator());
			}

			writer.close();

		} catch (Exception e) {
			throw new ServletException("Exception in  Download ScheduledExamResult Servlet", e);
		} finally {
			if (out != null)
				out.close();
		}
		
		
	}  

	
}
