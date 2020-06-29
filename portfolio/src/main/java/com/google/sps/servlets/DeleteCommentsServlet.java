
package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.sps.data.Comment;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet responsible for listing comments. */
@WebServlet("/delete-data")
public class DeleteCommentsServlet extends HttpServlet {
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Query query = new Query("Comment");
        DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
        PreparedQuery results = ds.prepare(query);

        for (Entity entity: results.asIterable()) {
            ds.delete(entity.getKey());
        }

        Gson gson = new Gson();
        response.setContentType("applciation/json");
        response.getWriter().println(gson.toJson(""));
    }
}