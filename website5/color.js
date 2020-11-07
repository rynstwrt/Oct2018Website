class Color
{
	constructor(hue, sat, lum)
	{
		this.hue = hue;
		this.sat = parseFloat(sat);
		this.lum = parseFloat(lum);
	}

	getShades(steps)
	{
		let shades = [];
		const step = this.lum / steps;
		for (let i = 0; i < steps; ++i)
		{
			shades.push([this.hue, this.sat, step * i]);
		}
		return shades;
	}

	getTints(steps)
	{
		let tints = [];
		const step = (100 - this.lum) / steps;
		for (let i = 0; i < steps; ++i)
		{
			tints.push([this.hue, this.sat, this.lum + step * i]);
		}
		return tints;
	}

	getComplimentary()
	{
		return [this.hue + 180, this.sat, this.lum];
	}

	getSplitComplementary(range)
	{
		return [[this.hue + range, this.sat, this.lum],
		[this.hue + 180, this.sat, this.lum],
		[this.hue - range, this.sat, this.lum]];
	}

	getDoubleSplitComplementary(range)
	{
		return [[this.hue + range, this.sat, this.lum],
		[this.hue + 180 - range, this.sat, this.lum],
		[this.hue + 180 + range, this.sat, this.lum],
		[this.hue - range, this.sat, this.lum]];
	}

	getAnalagous(range, steps)
	{
		let colors = [];
		const minH = this.hue - range;
		const maxH = this.hue + range;
		const step = (maxH - minH) / steps;


		for (let i = 0; i < steps; ++i)
		{
			colors.push([step * i, this.sat, this.lum]);
		}

		return colors;
	}

	getTriadic()
	{
		return [[this.hue - 120, this.sat, this.lum], [this.hue, this.sat, this.lum], [this.hue + 120, this.sat, this.lum]];
	}
}
