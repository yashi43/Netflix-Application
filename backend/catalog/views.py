from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required

from .models import Movie
from .forms import MovieForm


@login_required
def home(request):
    movies = Movie.objects.all().order_by('-release_year')

    return render(
        request,
        'home.html',
        {'movies': movies}
    )


@login_required
def movie_detail(request, pk):
    movie = get_object_or_404(Movie, id=pk)

    return render(
        request,
        'movie_detail.html',
        {'movie': movie}
    )


@login_required
def add_movie(request):
    if request.method == 'POST':
        form = MovieForm(request.POST)

        if form.is_valid():
            form.save()
            return redirect('home')

    else:
        form = MovieForm()

    return render(
        request,
        'add_movie.html',
        {'form': form}
    )


@login_required
def edit_movie(request, pk):
    movie = get_object_or_404(Movie, id=pk)

    if request.method == 'POST':
        form = MovieForm(request.POST, instance=movie)

        if form.is_valid():
            form.save()
            return redirect('movie_detail', pk=movie.id)

    else:
        form = MovieForm(instance=movie)

    return render(
        request,
        'edit_movie.html',
        {
            'form': form,
            'movie': movie
        }
    )


@login_required
def delete_movie(request, pk):
    movie = get_object_or_404(Movie, id=pk)

    if request.method == 'POST':
        movie.delete()
        return redirect('home')

    return render(
        request,
        'delete_movie.html',
        {'movie': movie}
    )