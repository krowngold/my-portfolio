package com.google.sps.data;

/** A user-generated comment */
public class Comment {

    private final String name;
    private final String content;
    private final long timestamp;

    public Comment(String name, String content, long timestamp) {
        this.name = name;
        this.content = content;
        this.timestamp = timestamp;
    }
}