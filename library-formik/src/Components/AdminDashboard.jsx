import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [editBookIndex, setEditBookIndex] = useState(null);
  const [editAuthorIndex, setEditAuthorIndex] = useState(null);

  // Formik form for adding/editing books
  const bookForm = useFormik({
    initialValues: {
      title: '',
      author: '',
      isbn: '',
      publicationDate: '',
    },
    onSubmit: (values, { resetForm }) => {
      if (editBookIndex !== null) {
        const updatedBooks = [...books];
        updatedBooks[editBookIndex] = values;
        setBooks(updatedBooks);
        setEditBookIndex(null);
      } else {
        setBooks([...books, values]);
      }
      resetForm();
    },
    validate: (values) => {
      const errors = {};
      if (!values.title) {
        errors.title = 'Title is required';
      }
      if (!values.author) {
        errors.author = 'Author is required';
      }
      if (!values.isbn) {
        errors.isbn = 'ISBN is required';
      }
      if (!values.publicationDate) {
        errors.publicationDate = 'Publication Date is required';
      }
      return errors;
    },
  });

  // Formik form for adding/editing authors
  const authorForm = useFormik({
    initialValues: {
      name: '',
      birthDate: '',
      biography: '',
    },
    onSubmit: (values, { resetForm }) => {
      if (editAuthorIndex !== null) {
        const updatedAuthors = [...authors];
        updatedAuthors[editAuthorIndex] = values;
        setAuthors(updatedAuthors);
        setEditAuthorIndex(null);
      } else {
        setAuthors([...authors, values]);
      }
      resetForm();
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = 'Name is required';
      }
      if (!values.birthDate) {
        errors.birthDate = 'Birth Date is required';
      }
      if (!values.biography) {
        errors.biography = 'Biography is required';
      }
      return errors;
    },
  });

  // Edit a book
  const editBook = (index) => {
    const bookToEdit = books[index];
    bookForm.setValues(bookToEdit);
    setEditBookIndex(index);
  };

  // Edit an author
  const editAuthor = (index) => {
    const authorToEdit = authors[index];
    authorForm.setValues(authorToEdit);
    setEditAuthorIndex(index);
  };

  // Delete a book record
  const deleteBook = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
  };

  // Delete an author record
  const deleteAuthor = (index) => {
    const updatedAuthors = [...authors];
    updatedAuthors.splice(index, 1);
    setAuthors(updatedAuthors);
  };

  return (
    <>
    <Typography className='header' variant="h3"style={{ marginBottom: 20 , textAlign: 'center', paddingTop: 10, paddingBottom: 10}}>Library Management System</Typography>
      <Container style={{ marginTop: 20 }}>
        <Typography className='admin' variant="h4" style={{ marginBottom: 20 , color:'white' , textAlign: 'center'}}>Admin Dashboard</Typography>
        <Grid container spacing={3}>
          {/* Add Book Form */}
          <Grid item xs={6}>
            <Paper elevation={3} style={{ padding: 20 }}>
              <Typography variant="h5">Add Book</Typography>
              <form onSubmit={bookForm.handleSubmit}>
                <TextField
                  label="Title"
                  name="title"
                  value={bookForm.values.title}
                  onChange={bookForm.handleChange}
                  error={bookForm.touched.title && Boolean(bookForm.errors.title)}
                  helperText={bookForm.touched.title && bookForm.errors.title}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Author"
                  name="author"
                  value={bookForm.values.author}
                  onChange={bookForm.handleChange}
                  error={bookForm.touched.author && Boolean(bookForm.errors.author)}
                  helperText={bookForm.touched.author && bookForm.errors.author}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="ISBN"
                  name="isbn"
                  value={bookForm.values.isbn}
                  onChange={bookForm.handleChange}
                  error={bookForm.touched.isbn && Boolean(bookForm.errors.isbn)}
                  helperText={bookForm.touched.isbn && bookForm.errors.isbn}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Publication Date"
                  name="publicationDate"
                  type="date"
                  value={bookForm.values.publicationDate}
                  onChange={bookForm.handleChange}
                  error={
                    bookForm.touched.publicationDate &&
                    Boolean(bookForm.errors.publicationDate)
                  }
                  helperText={
                    bookForm.touched.publicationDate &&
                    bookForm.errors.publicationDate
                  }
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Button variant="contained" color="primary" type="submit">
                  Add Book
                </Button>
              </form>
            </Paper>
          </Grid>
          {/* Add Author Form */}
          <Grid item xs={6}>
            <Paper elevation={3} style={{ padding: 20 }}>
              <Typography variant="h5">Add Author</Typography>
              <form onSubmit={authorForm.handleSubmit}>
                <TextField
                  label="Name"
                  name="name"
                  value={authorForm.values.name}
                  onChange={authorForm.handleChange}
                  error={authorForm.touched.name && Boolean(authorForm.errors.name)}
                  helperText={authorForm.touched.name && authorForm.errors.name}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Birth Date"
                  name="birthDate"
                  type="date"
                  value={authorForm.values.birthDate}
                  onChange={authorForm.handleChange}
                  error={authorForm.touched.birthDate && Boolean(authorForm.errors.birthDate)}
                  helperText={authorForm.touched.birthDate && authorForm.errors.birthDate}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  label="Biography"
                  name="biography"
                  multiline
                  rows={4.5}
                  value={authorForm.values.biography}
                  onChange={authorForm.handleChange}
                  error={
                    authorForm.touched.biography && Boolean(authorForm.errors.biography)
                  }
                  helperText={authorForm.touched.biography && authorForm.errors.biography}
                  fullWidth
                  margin="normal"
                />
                <Button variant="contained" color="primary" type="submit">
                  Add Author
                </Button>
              </form>
            </Paper>
          </Grid>
          {/* Book List */}
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: 20 }}>
              <Typography variant="h5">Book List</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Author</TableCell>
                      <TableCell>ISBN</TableCell>
                      <TableCell>Publication Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {books.map((book, index) => (
                      <TableRow key={index}>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.isbn}</TableCell>
                        <TableCell>{book.publicationDate}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => deleteBook(index)}>
                            <DeleteIcon color="secondary" />
                          </IconButton>
                          <IconButton onClick={() => editBook(index)}>
                            <EditIcon color="primary" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          {/* Author List */}
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: 20 }}>
              <Typography variant="h5">Author List</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Birth Date</TableCell>
                      <TableCell>Biography</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {authors.map((author, index) => (
                      <TableRow key={index}>
                        <TableCell>{author.name}</TableCell>
                        <TableCell>{author.birthDate}</TableCell>
                        <TableCell>{author.biography}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => deleteAuthor(index)}>
                            <DeleteIcon color="secondary" />
                          </IconButton>
                          <IconButton onClick={() => editAuthor(index)}>
                            <EditIcon color="primary" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
    
  );
};

export default AdminDashboard;
