package TheBudgeteers.dto;

public class TaskDTO {
    private Long id;
    private String title;
    private String description;
    private String status;
    private Integer priority;

    // Default constructor - REQUIRED for JSON deserialization
    public TaskDTO() {}
    
    // Full constructor - convenient for creating objects
    public TaskDTO(Long id, String title, String description, String status, Integer priority) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
    }

    // Getters and Setters - REQUIRED for JSON conversion
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public Integer getPriority() { return priority; }
    public void setPriority(Integer priority) { this.priority = priority; }
}

